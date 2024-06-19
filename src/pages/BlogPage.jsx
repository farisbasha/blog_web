import { useEffect } from 'react'
import BlogCard from './components/BlogCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../redux/slices/blogSlice'

const BlogPage = () => {
  const dispatch = useDispatch()
  const blogState   = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  if(blogState.isLoading){
    return <h1>Loading</h1>
  }

  if(blogState.error){
    return <h1>{blogState.error?.message ?? "Something went wrong"}</h1>
  }

  return (
    <div className='flex  gap-3 flex-wrap mt-5 mx-4'>
        {blogState.blogsList.map((blog)=>{
          return <BlogCard key={blog.id} blog={blog}/>
        })
        }
      </div>
  )
}

export default BlogPage
