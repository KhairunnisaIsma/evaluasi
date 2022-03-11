import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import Button from "./component/Button";

export default function Home() {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([]);
  const [edit, setedit] = useState(null);
  const getData = () => {
    console.log("get data");
    axios.get("http://localhost:3001/list").then((hasil) => {
      setdata(hasil.data);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.kegiatan.value;
    axios.post("http://localhost:3001/list", { name: value }).then(() => {
      console.log("post");
      getData();
    });

    e.target.list.value = "";
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/list/${id}`).then(() => {
      console.log("delete");
      getData();
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("index edit", edit, data[edit].id);
    axios
      .patch(`http://localhost:3001/list/${data[edit].id}`, {
        name: e.target.kegiatan.value,
      })
      .then(() => {
        getData();
        setedit(null);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div class="bg-blue w-full h-screen font-sans">
      <div class="flex p-2 bg-blue-dark items-center">
        <h1 class="text-blue-lighter text-xl flex items-center font-sans italic">
          Trello
        </h1>
        <div class="flex items-center ml-auto">
          <button class="bg-blue-light rounded h-8 w-8 font-bold text-white text-sm mr-2">
            +
          </button>
          <button class="bg-blue-light rounded h-8 w-8 font-bold text-white text-sm mr-2">
            i
          </button>
          <button class="bg-red rounded h-8 w-8 font-bold text-white text-sm mr-2">
            <svg
              class="h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex px-4 pb-8 items-start overflow-x-scroll">
        <div class="rounded bg-grey-light  flex-no-shrink w-64 p-2 mr-3">
          <div class="flex justify-between py-1">
            <h3 class="text-sm">New landing page</h3>
            <button onClick={() => setShow(!show)}>
              <AiOutlinePlus />
            </button>
            {show ? (
              <div className="fixed  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
                <div class="relative top-40 mx-auto shadow-lg rounded-md bg-white max-w-md">
                  <div class="flex justify-between items-center bg-green-500 text-white text-xl rounded-t-md px-4 py-2">
                    <h3>Modal header</h3>
                    <button onClick={() => setShow(false)}>x</button>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="p-5 grid grid-cols-2 gap-4 border rounded-lg drop-shadow-2xl bg-white"
                  >
                    <input
                      type="text"
                      className="form-input"
                      name="kegiatan"
                      placeholder="masukkan kegiatan"
                    />
                    <Button
                      type="submit"
                      text="Add New"
                      tahu="goreng"
                      tempe="bacem"
                    />
                  </form>

                  <div class="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
                    <button
                      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => setShow(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div class="text-sm mt-2">
            <div>
              {data.map((kegiatan, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter"
                  >
                    {edit === i ? (
                      <form
                        className="w-full flex space-x-2"
                        onSubmit={(event) => handleEdit(event)}
                      >
                        <input
                          className="form-input w-2/3"
                          name="kegiatan"
                          defaultValue={kegiatan.name}
                        />
                        <button className="bg-blue-500 text-white px-2 rounded-lg w-1/3">
                          Save
                        </button>
                      </form>
                    ) : (
                      kegiatan.name
                    )}
                    <div className="flex py-4 gap-4 text-center">
                      <button onClick={() => setedit(i === edit ? null : i)}>
                        <IoPencilOutline />
                      </button>
                      <button onClick={() => handleDelete(kegiatan.id)}>
                        <IoTrashOutline />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3">
          <div class="flex justify-between py-1">
            <h3 class="text-sm">Old landing</h3>
          </div>
          <div class="text-sm mt-2">
            <div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
              Delete all references from the wiki
            </div>
            <button className="btn btn-danger">
              <IoTrashOutline />
            </button>
            &nbsp;
            <button className="btn btn-success">
              <IoPencilOutline />
            </button>
          </div>
          <button>Done</button>
        </div>
      </div>
    </div>
  );
}
