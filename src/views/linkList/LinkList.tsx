import React, { useState,useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FEED_QUERY, DELETE_LINK_MUTATION, VOTE_MUTATION } from "../../graphQL";
// import Link from '../../components/link'; // Make sure to adjust the path based on your project structure
import { AUTH_TOKEN } from "../../constants";
import { timeDifferenceForDate } from "../../utils/Date";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Store } from "react-notifications-component";
import { CreateLink } from "../../components/popup/";

const LinkList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const currentUserId = localStorage.getItem("currentUserId");
  const { data, loading, error, refetch } = useQuery(FEED_QUERY, {
    onCompleted: () => {
      refetch();
    },
  });
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [deleteLink] = useMutation(DELETE_LINK_MUTATION);
  const [voteMutation] = useMutation(VOTE_MUTATION);
  const handleDeleteLink = async (linkId: string) => {
    try {
      await deleteLink({
        variables: { deleteLinkId: linkId },
        update: (cache, { data: { deleteLink } }) => {
          const existingLinks: any = cache.readQuery({ query: FEED_QUERY });
          const newLinks = existingLinks.feed.links.filter(
            (link: any) => link.id !== deleteLink.id,
          );
          cache.writeQuery({
            query: FEED_QUERY,
            data: {
              feed: {
                links: newLinks,
              },
            },
          });
        }
      });
      Store.addNotification({
        title: "Success",
        message: "Link deleted successfully!",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      refetch();
    } catch (error: any) {
      Store.addNotification({
        title: "Error",
        message: "Link deleted error!",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };
  useEffect(() => {
    refetch();
  }, [openModal]);

  const handleVote = async (linkId: string) => {
    try {
      await voteMutation({
        variables: { linkId },
      });
      Store.addNotification({
        title: "Success",
        message: "Link voted successfully!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      refetch();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEditLink = async (linkId: string) => {
    try {
    } catch (error: any) {}
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading links...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mt-4 mb-4">
        <h1 className="text-2xl">Links</h1>
        {authToken && (
          <button
            className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 animate-bounce overflow-hidden"
            onClick={() => setOpenModal(true)}
          >
            Create New Link
            <span className="absolute inset-0 border-2 border-transparent rounded-full transition-all duration-300 group-hover:border-white"></span>
          </button>
        )}
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">URL</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.feed.links.map((link: any) => (
            <tr key={link.id}>
              <td className="py-2 px-4 border-b">{link.id}</td>
              <td className="py-2 px-4 border-b">
                {timeDifferenceForDate(link.createdAt)}
              </td>
              <td className="py-2 px-4 border-b">{link.url}</td>
              <td className="py-2 px-4 border-b">{link.description}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex justify-around">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditLink(link.id)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <MdDelete />
                  </button>
                  {authToken && (
                    <>
                      <div className="mr-1">|</div>
                      <button onClick={() => handleVote(link.id)}>
                        {link.votes.some(
                          (vote: any) => vote.user.id === currentUserId,
                        ) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && (
        <CreateLink openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default LinkList;
