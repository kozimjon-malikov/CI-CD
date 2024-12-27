export const getAllPosts = async () => {
    try {
        const response = await fetch('http://localhost:3000/posts')
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}
// delete post 
export const deletePost = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}


// getA Post 
export const getAPost = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}