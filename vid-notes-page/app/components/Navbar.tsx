import React from 'react'

const Navbar = () => {
    const navbarSettings = 'h-16 mb-8 bg-main p-4';
    const headerContainer = 'w-6/12 flex flex-row sm:w-3/12 justify-between m-auto';
    const textSettings = 'text-white text-lg';
    return (
        <div className={`${navbarSettings}`}>
            <div className={`${headerContainer}`}>
                <h1 className={`${textSettings}`}> Home </h1>
                <a href='/#usage'> 
                    <h1 className={`${textSettings}`}> Usage </h1>
                </a>
            </div>
        </div>
    )
}

export default Navbar