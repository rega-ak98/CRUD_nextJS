import React from "react";

const ModalViewData = ({ data, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="z-20 bg-white p-8 w-[516px] h-[294px] mx-auto rounded-[16px] shadow-lg">
          <div className="p-1 modal">
            <h2 className="text-[26px] font-semibold mb-2 text-center">
              Gelombang
            </h2>
            <div className="mb-1">
              <label htmlFor="gelombang" className="block mb-0">
                Nama Gelombang
              </label>
              <input
                type="text"
                id="gelombang"
                name="gelombang"
                value={data.gelombang}
                disabled
                className="border rounded-[8px] p-[8px] w-full font-[14px]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="keterangan" className="block mb-0">
                Keterangan
              </label>
              <input
                type="text"
                id="keterangan"
                name="keterangan"
                value={data.keterangan}
                disabled
                className="border rounded-[8px] p-[8px] w-full font-[14px]"
              />
            </div>
            <div className="flex justify-center">
            <button onClick={onClose} className="w-[114px] h-[36px] bg-[#6FD943] rounded-[4px] text-white me-1 font-[14px]">
              oke
            </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalViewData;
