import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import { useState } from 'react';




const NavBar = () => {

  const [isOpen, onOpenChange] = useState(false)

  return (

      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blog web</span>
              <Button color='primary' variant='shadow' onClick={() => onOpenChange(true)} >Add Blog</Button>
        </div>
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Blog</ModalHeader>
              <ModalBody>
                <Input label="Title" bordered />
                <Input label="Description" bordered />
                <Input label="Author" bordered />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </nav>

  )
}

export default NavBar






