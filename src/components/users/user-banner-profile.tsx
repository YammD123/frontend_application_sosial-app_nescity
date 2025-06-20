"use client"

import { profileActionUpdateAvatar, profileActionUpdateCover} from '@/actions/profile-action'
import { Avatar, AvatarFallback, AvatarImage } from '@/common/shadcn/avatar'
import { Button } from '@/common/shadcn/button'
import { Card, CardContent } from '@/common/shadcn/card'
import { ImagePlus, Save, Trash } from 'lucide-react'
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

export default function UserBannerProfile({profile}:Props) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const inputRef2 = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string | null>(null);
    const [preview2, setPreview2] = React.useState<string | null>(null);
    const [state,formData] = useActionState(profileActionUpdateCover,{message:"",success:false});
    const [state2,formData2] = useActionState(profileActionUpdateAvatar,{message:"",success:false});

    const handleClick = () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
    }

    const handleClick2 = () => {
        if (inputRef2.current) {
          inputRef2.current.click();
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

    const handlePreviewAvatarImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file){
            const loadRenderImage = new FileReader()
            loadRenderImage.onload = ()=>{
                setPreview2(loadRenderImage.result as string)
            }
            loadRenderImage.readAsDataURL(file)
        }else{
            setPreview2(null)
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

    React.useEffect(() => {
        if (preview2){
            URL.revokeObjectURL(preview2)
        }
    }, [preview2])

    React.useEffect(()=>{
        if (state?.success){
            toast.success(state.message)
        }
    },[state?.success])

    React.useEffect(()=>{
        if (state2?.success){
            toast.success(state2.message)
        }
    },[state2?.success])
  return (
    <>
    <Card className='bg-zinc-100 dark:bg-zinc-900' >
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
                        <div className='relative'>
                            {preview2 ? (
                                <Avatar className='w-40 h-40' >
                                    <AvatarImage className='object-cover z-0' src={preview2} />
                                    <AvatarFallback>SS</AvatarFallback>
                                </Avatar>
                            ):(
                                <Avatar className='w-40 h-40' >
                                    <AvatarImage className='object-cover z-0' src={profile.avatar_image} />
                                    <AvatarFallback>SS</AvatarFallback>
                                </Avatar>
                            )}
                        <Button onClick={handleClick2} className='absolute top-3 hover:bg-green-300 right-3 z-10 bg-green-300' >
                            <ImagePlus size={25}/>
                        </Button>
                        <form action={formData2} className='mt-2'>
                            <input name='avatar' onChange={handlePreviewAvatarImage} ref={inputRef2} type="file" className='hidden' />
                            {preview2 && (
                                <Button type='submit' variant="outline">
                                    <Save size={25}/>
                                    Simpan
                                </Button>
                            )}
                        </form>
                        </div>
                        <div className='flex flex-col ml-1'>

                        <div className='w-fit mt-3'>
                            <h1 className='text-2xl font-bold'>{profile.name}</h1>
                            <p className='text-muted-foreground'>{profile.user_name}</p>
                        </div>
                        <div className='w-fit mt-3'>
                            <p className='text-muted-foreground'>{profile.bio}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
    </>
  )
}
