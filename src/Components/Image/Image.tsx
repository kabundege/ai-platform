import { FC, ImgHTMLAttributes, useEffect, useRef, memo, useCallback } from 'react';

export interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string,
    alt?: string,
    pushSrc?: boolean,
    divClassName?: string,
    pushSrcFn?: (val:string) => void
}

const CustomeImage:FC<CustomImageProps> = ({ divClassName, src, pushSrcFn, pushSrc=false, alt='', ...rest }) => {
    const ImgRef = useRef<HTMLImageElement|null>(null)

    useEffect(()=>{
        if(src && ImgRef.current){
            ImgRef.current.src = src
        }
    },[src,ImgRef])

    const handlePush = useCallback(() => {
        // push up the image source when needed
        if(pushSrcFn && ImgRef.current)
        pushSrcFn(ImgRef.current.src)
    },[pushSrcFn])

    useEffect(()=>{
        if(pushSrc){
            handlePush()
        }
    },[pushSrc,handlePush])

    if(src)
    return (
        <img {...rest} ref={ImgRef} alt={alt} className={rest.className} />
    )

    return (
        <div className={`p-10 bg-slate-50 ${divClassName}`}>
            <img alt="" className={`p-10 bg-slate-50 ${rest.className}`} />
        </div>
    )
}

export default memo(CustomeImage)