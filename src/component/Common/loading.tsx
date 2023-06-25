import '@/styles/loading.css'
interface LoadingProps {
    isShow: boolean | null;
}

export function Loading({ isShow }: LoadingProps) {
    return (
        <>
            {isShow && (
                <div className='wrap-loading'>
                    <div className='loading-cont'>
                        <div className='cont'>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}