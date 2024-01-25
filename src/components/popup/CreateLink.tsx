import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_LINK_MUTATION } from "../../graphQL";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
interface EditLinkProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateLink: React.FC<EditLinkProps> = ({
  openModal,
  setOpenModal,
}) => {
  
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    onCompleted: () => {
      Store.addNotification({
        title: "Success",
        message: "Link created successfully!",
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
      navigate("/");
    },
    update: (cache, { data }) => {
      // Update the cache manually to reflect the new data
      const newLink = data.createLink; // Replace with the actual structure of your data
  
      cache.modify({
        fields: {
          // Assuming you have a 'allLinks' query, update it
          allLinks(existingLinks = []) {
            return [...existingLinks, newLink];
          },
        },
      });
    },
  });
  
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Create Link
                </h3>
                <div className="mt-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      createLink();
                      setOpenModal(false);
                    }}
                    className="flex flex-col space-y-4 items-center"
                  >
                    <input
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition-all duration-300 w-full"
                      value={formState.description}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          description: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="A description for the link"
                    />
                    <input
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition-all duration-300 w-full"
                      value={formState.url}
                      onChange={(e) =>
                        setFormState({ ...formState, url: e.target.value })
                      }
                      type="text"
                      placeholder="The URL for the link"
                    />
                    <div className="flex justify-center space-x-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => setOpenModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
