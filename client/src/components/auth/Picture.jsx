import { useRef, useState } from "react";

export default function Picture({
  readablePicture,
  setReadablePicture,
  setPicture,
}) {
  const inputRef = useRef();
  const [error, setError] = useState("");
  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name} format is no supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed`);
      return;
    } else {
      setPicture(pic);
      setError("");
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };
  const handleRemovePic = () => {
    setPicture('');
    setReadablePicture("")
  }
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="Picture"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div className="w-20 dark:bg-dark_bg_3 rounded-md text-xs mt-2 p-1 font-bold flex items-center justify-center cursor-pointer" onClick={handleRemovePic}>
              Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload Picture
          <input
            type="file"
            name="picture"
            id="picture"
            hidden
            accept="image/png,image/jpeg,image/webp"
            ref={inputRef}
            onChange={handlePicture}
          />
        </div>
      )}
      {error && (
        <div className="mt-2">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
