import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaFileImport } from "react-icons/fa6";

const ImportDataModal = ({ isOpen, onClose }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleImport = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      Swal.fire({
        title: "Error!",
        text: "Data tidak boleh kosong!",
        icon: "error",
        confirmButtonText: "Oke",
        confirmButtonColor: "#FF3A6E",
      });
      return;
    }
    setUploadedFile(selectedFile);
  };

  const handleSave = () => {
    if (uploadedFile) {
      console.log("File yang diunggah:", uploadedFile);
    }

    onClose();
  };

  return (
    <div className={isOpen ? "block" : "hidden"}>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="z-20 bg-white p-8 w-[516px] h-[294px] mx-auto rounded-[16px] shadow-lg">
              <div className="p-1 modal text-center">
                <h2 className="text-[26px] font-semibold mb-2 text-center text-[#666666]">
                  Drop File Here
                </h2>
                <div className="modal-content">
                  <div className="py-[2rem] flex items-center justify-center border-dashed border-2 border-gray-400 rounded-lg cursor-pointer">
                    <FaFileImport className="text-4xl" />
                    <input
                      type="file"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="flex justify-center my-5">
                  <button
                    onClick={onClose}
                    type="button"
                    className="w-[114px] h-[36px] bg-[#FF3A6E] rounded-[4px] text-white me-1 font-[14px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    type="button"
                    className="w-[114px] h-[36px] bg-[#10487A] rounded-[4px] text-white font-[14px]"
                  >
                    Save
                  </button>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-[#666666] text-[14px]">Gelombang</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportDataModal;
