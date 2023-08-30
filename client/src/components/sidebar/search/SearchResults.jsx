import Contact from "./Contact";

export default function SearchResults({ searchResults }) {
  return (
    <div className="w-full convos scrollbar">
      <div>
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contact</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
        </div>
        <ul>
          {searchResults &&
            searchResults.map((user) => (
              <Contact key={user._id} contact={user} />
            ))}
        </ul>
      </div>
    </div>
  );
}
