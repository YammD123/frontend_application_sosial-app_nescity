export const postActionCreate = async(prev:any,formData:FormData)=>{
    const caption = formData.append("caption",formData.get("caption")!)
    const media = formData.append("image",formData.get("image")!);

    
}