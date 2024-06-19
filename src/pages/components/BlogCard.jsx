import { Button } from '@nextui-org/button'
import PropTypes from 'prop-types'
import { MdDelete, MdEditSquare } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteBlog, editBlog, getBlogs } from '../../redux/slices/blogSlice'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { useState } from 'react'
import { Input } from '@nextui-org/input'
import { toast } from 'sonner'

const BlogCard = (
  {
    blog
  }
) => {
  const [isOpen, onOpenChange] = useState(false)

  const dispatch = useDispatch()
  return (
    
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>

          <div className="flex gap-2">
          <Button color='default' className='mt-3 text-2xl'
          onClick={() => onOpenChange(true)}
          ><MdEditSquare/></Button>
          <Button color='danger' className='mt-3 text-2xl' 
          onClick={
            async ()=>{
              try {
                await dispatch(deleteBlog(blog.id)).unwrap()
                await dispatch(getBlogs())
                toast.success('Blog deleted successfully')
              } catch (error) {
                toast.error("Failed to delete blog")
              }
            }
          }
          ><MdDelete/></Button>
          </div>

          <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Blog</ModalHeader>
              <ModalBody>
                <form id='edit-blog' className='flex flex-col gap-2'
                onSubmit={async (e)=>{
                  e.preventDefault();
                  const title = e.target.title.value
                  const description = e.target.description.value
                  const author = e.target.author.value
                  
                  onOpenChange(false)
                  try {
                    
                  await dispatch(editBlog({
                    title:title,
                    description:description,
                    author:author,
                    id:blog.id
                  })).unwrap()
                  await dispatch(getBlogs())
                  toast.success('Blog updated successfully')
                  } catch (error) {
                    toast.error("Failed to update blog")
                  }
                }}
                 >
                  <Input label="Title" bordered name="title" defaultValue={blog.title}/>
                  <Input label="Description" bordered name="description" defaultValue={blog.description} />
                  <Input label="Author" bordered name="author"  defaultValue={blog.author}/>
                </form>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type='submit' form='edit-blog'>
                 Update Blog
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </a>

  )
}

BlogCard.propTypes = {
  blog: PropTypes.object
}

export default BlogCard
