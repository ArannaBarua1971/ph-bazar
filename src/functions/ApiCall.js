const getData = async (url) => {
  const apis = [
    `${process.env.NEXT_PUBLIC_API1_BASE_URL}/${url}`,
    `${process.env.NEXT_PUBLIC_API2_BASE_URL}/${url}`,
  ];
  try {
    for (const api of apis) {
      try {
        const res = await fetch(api);

        if (!res.ok) continue;

        return res.json();
      } catch {
        continue;
      }
    }
  }catch(error){
    console.log(error)
  }
};

export { getData };
