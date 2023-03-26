import { useState } from "react";
// import { fetchDoi } from "../api/fetchDOI";
function DoiMetadata({ doi }: { doi: string }) {
  const [metadata, setMetadata] = useState<any>(null);

  // async function loadMetadata() {
  //   const data = await FetchDoiData(doi);
  //   setMetadata(data);
  // }

  if (!metadata) {
    return (
      <div>{/* <button onClick={loadMetadata}>Load metadata</button> */}</div>
    );
  }

  const { title, author } = metadata.message;

  return (
    <div>
      <h1>{title}</h1>
      <p>Author: {author}</p>
    </div>
  );
}
export default DoiMetadata;
