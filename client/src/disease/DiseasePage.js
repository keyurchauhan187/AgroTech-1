import React, { useState } from "react";
import Swal from 'sweetalert2';

const DiseasePage = () => {
  console.log("##########");

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  const submitImage = () => {
    console.log("#### img");

    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "disease_image");
      data.append("cloud_name", "deq0hxr3t");

      fetch("https://api.cloudinary.com/v1_1/deq0hxr3t/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to upload image to Cloudinary");
          }
        })
        // ##### url backend baki
        .then((data) => {
          console.log( data.url )
          fetch("https://agrotech-y7d0.onrender.com/framAi", {
            method: "POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({ url: data.url })
          }).then((res) =>res.json()  ).then(res=>
          {
            Swal.fire({
              title: 'Plant Disease!',
              text: res.genDescription,
              icon: 'info',
              confirmButtonText: 'Okay!',
              confirmButtonColor:"#013220",
              iconColor:"#013220"
            })
          }
          )
        }
        )

        .catch((error) => console.error("Error:", error));
    } else {
      console.error("No image selected for upload");
    }
  };

  return (
    <div className="mt-5">
      <div className="shade">
        <div className="h1 d-flex justify-content-center text-align-center text-white font-bold my-2">
          Disease Detection
        </div>
        <div className="d-flex justify-center h2">
          <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
            <div className="w-full p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 ">
              <div className="flex flex-col gap-3">
                <p className="text-white mx-4">
                  Upload imagefor plant disease detection
                </p>
                <div className="text-align-center d-flex justify-content-center">
                  <input
                    type="file"
                    id="plant-img-file"
                    onChange={handleImageChange}
                    hidden
                  />
                  <label
                    htmlFor="plant-img-file"
                    className="text-4xl text-white cursor-pointer"
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </label>
                </div>
                {imageName && (
                  <p className="text-base text-white d-flex justify-content-center text-align-center">
                    {imageName}
                  </p>
                )}
                <div className="d-flex justify-content-center mt-3">
                <button
                  onClick={submitImage}
                  className="p-2  mx-auto btn btn-success rounded"
                >
                  Upload Image
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePage;