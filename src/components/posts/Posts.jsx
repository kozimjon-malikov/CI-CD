import React, { useEffect, useRef, useState } from 'react'
import { deletePost, getAllPosts, getAPost } from './api/post';

export default function Posts() {
    const [posts, setPosts] = useState();
    const [datalist, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [open, setOpen] = useState(false)
    const modalRef = useRef(null)
    useEffect(() => {
        async function loadPosts() {
            setLoading(true)
            try {
                const data = await getAllPosts();
                setPosts(data);
            } catch (error) {
                setLoading(false)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        loadPosts();
    }, [])
    // delete 
    const handleDelete = async (id) => {
        if (window.confirm('are you sure?')) {
            try {
                await deletePost(id);
                setPosts(posts.filter((c => c.id !== id)))
            } catch (error) {
                console.log(error)
            }
        }
    }
    // view
    const handleView = async (id) => {
        setOpen(true)
        const data = await getAPost(id);
        setDataList(data)

    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && modalRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => { document.removeEventListener('mousedown', handleClickOutside) }
    }, []);

    if (loading) return <p className='text-2xl text-rose-600 font-bold'>Loading....</p>
    if (error) return <p className='text-2xl text-rose-600 font-bold'>Error....</p>
    return (
        <div className='container mx-auto my-3'>
            <button className='bg bg-blue-500 px-3 py-2 rounded-md text-white m-3'>
                Create
            </button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts && posts.map((item, i) => (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        <img src={item.img} alt="test" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleView(item.id)} >VIew</a>
                                        <a href="#" className="font-medium text-yellow-600 mx-2 dark:text-blue-500 hover:underline" onClick={() => handleEdit(id)} >Edit</a>
                                        <a href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline" onClick={() => handleDelete(item.id)}>Delete</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                open ?
                    <div ref={modalRef} className='fixed left-[20%] top-0 w-[60%]   h-screen bg-blue-400 opacity-1'>
                        <div className="w-8/12 mt-24 mx-auto my-auto">
                            <h2>View posts:</h2>
                            <p>Name:{datalist.title}</p>
                            <a href="" onClick={() => setOpen(false)}>Close</a>
                        </div>
                    </div>
                    : null
            }

        </div>
    )
}
