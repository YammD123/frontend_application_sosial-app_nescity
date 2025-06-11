"use client"

import { profileActionUpdateCover } from '@/actions/profile-action'
import { Avatar, AvatarFallback, AvatarImage } from '@/common/shadcn/avatar'
import { Button } from '@/common/shadcn/button'
import { Card, CardContent } from '@/common/shadcn/card'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useActionState } from 'react'
import { toast } from 'sonner'

interface Props{
    profile:{
        name:string
        user_name: string
        avatar_image: string
        cover_image: string
        pendidikan:string
        pekerjaan:string
        alamat:string
        bio:string
        website:string
    }
}

export default function HeaderProfile({profile}:Props) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string | null>(null);
    const [state,formData] = useActionState(profileActionUpdateCover,{message:"",success:false});

    const handleClick = () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
    }

    const handlePreviewBannerImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file){
            const loadRenderImage = new FileReader()
            loadRenderImage.onload = ()=>{
                setPreview(loadRenderImage.result as string)
            }
            loadRenderImage.readAsDataURL(file)
        }else {
            setPreview(null)
        }
    }

    const handleRemoveBannerImage = () => {
        setPreview(null)
    }

    React.useEffect(() => {
        if (preview){
            URL.revokeObjectURL(preview)
        }
    }, [preview])

    React.useEffect(()=>{
        if (state?.success){
            toast.success(state.message)
        }
    },[state?.success])
  return (
    <>
    <Card >
        <CardContent className='flex flex-col justify-center items-center gap-4'>
            <div>
                <div className='relative'>
                    {preview ? (
                        <Image
                        src={preview}
                        width={1000}
                        height={100}
                        alt='cover'
                        className=' z-0 rounded-sm h-96 object-cover'
                        />
                    ):(
                        <Image
                        src={profile.cover_image}
                        width={1000}
                        height={100}
                        alt='cover'
                        className=' z-0 rounded-sm h-96 object-cover'
                        />
                    )}
                    <div className='absolute bottom-3 z-10  right-3'>
                        {!preview && (
                            <Button onClick={handleClick} className='opacity-0 sm:opacity-100' variant="outline">
                                <ImagePlus size={25}/>
                                Tambahkan Banner Profil
                            </Button>
                        )}
                    <Button onClick={handleClick} className='sm:opacity-0' variant="outline">
                        <ImagePlus size={25}/>
                    </Button>
                    </div>
                    {preview && (
                    <Button onClick={handleRemoveBannerImage} variant={"destructive"} className='absolute top-3 right-3'>
                        <Trash size={25}/>
                    </Button>
                    )}
                    <div  className='absolute bottom-3 z-10 right-3'>
                        <form action={formData}>
                            <input ref={inputRef} onChange={handlePreviewBannerImage} type="file" className='hidden' name='banner' id='cover_image'/>
                            {preview && (
                                <Button type='submit' variant="outline">Save Banner</Button>
                            )}
                        </form>
                    </div>
                    <div className='absolute w-full flex bottom-1 left-3'>
                        <Avatar className='w-40 h-40' >
                            <AvatarImage className='object-cover' src={profile.avatar_image} />
                            <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                        <div className='w-fit mt-3'>
                            <h1 className='text-2xl font-bold'>{profile.name}</h1>
                            <p className='text-muted-foreground'>{profile.user_name}</p>
                            <p>{profile.bio || "Belum ada bio"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
    </>
  )
}
