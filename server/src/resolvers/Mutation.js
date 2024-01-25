const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../utils");

async function post(parent, args, context, info) {
  const { userId } = context;

  let postedBy = undefined;
  if (userId) {
    postedBy = { connect: { id: userId } };
  }

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy,
    },
  });

  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
}

async function signup(parent, args, context, info) {
  try {
    const password = await bcrypt.hash(args.password, 10);
    // check user with email already exists
    const userExists = await context.prisma.user.findUnique({
      where: { email: args.email },
    });
    if (userExists) {
      throw new Error("User already exists");
    }
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error(`Signup failed: ${error.message}`);
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function vote(parent, args, context, info) {
  try {
    const { userId } = context;

    const vote = await context.prisma.vote.findUnique({
      where: {
        linkId_userId: {
          linkId: args.linkId,
          userId: userId,
        },
      },
    });

    if (vote) {
      // User has already voted, remove the vote (unvote)
      await context.prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      // Inform the client that the vote has been removed
      context.pubsub.publish("VOTE_REMOVED", { voteRemoved: vote });

      // You can return some information or null indicating success
      return { message: `Vote removed for link: ${args.linkId}` };
    }

    const newVote = await context.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      },
    });

    // Publish the new vote with the correct payload
    context.pubsub.publish("NEW_VOTE", { newVote });

    return { message: `Vote added for link: ${args.linkId}` };
  } catch (error) {
    return { message: "Error voting" };
  }
}

async function deleteLink(parent, args, context, info) {
  try {
    const { id } = args;

    // Delete votes associated with the link
    await context.prisma.vote.deleteMany({
      where: {
        link: {
          id,
        },
      },
    });

    // Delete the link
    await context.prisma.link.delete({
      where: { id },
    });

    console.log("Link and associated votes deleted successfully");
    return { message: "Link and associated votes deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Error deleting link and associated votes" };
  }
}


module.exports = {
  post,
  signup,
  login,
  vote,
  deleteLink,
};
