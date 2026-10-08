const  getData=async(url)=>{
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`);
  return res.json();
}

export {getData}

