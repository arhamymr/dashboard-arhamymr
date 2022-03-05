import { useState } from "react";
import { getDetailDocument } from "api/posts";

function useDetail() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getDetail = async (id) => {
    setLoading(true);
    try {
      const response = await getDetailDocument("posts", id)
      setData(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    getDetail
  };
}



export default useDetail;
