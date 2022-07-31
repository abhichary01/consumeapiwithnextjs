import { FunctionComponent, ReactNode } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Spinner } from "@chakra-ui/react";

type Page = {
  children: ReactNode,
  isLoading?: boolean
}

const Page: FunctionComponent<Page> = ({ children, isLoading = false }) => {

  return (
    <motion.div key={children?.toString()} initial={{opacity: 0, y: 40}} 
      animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -40}} 
      transition={{duration: 0.6, delayChildren: 0.5, ease: "easeInOut"}} className='h-[100%] flex justify-center items-center flex-col gap-5'>

      <AnimatePresence>
        {
          !isLoading && (
            <motion.div key={isLoading.toString()} className='absolute' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
              { children }
            </motion.div>
          ) || isLoading && (
            <motion.div key={isLoading.toString()} className='absolute' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
              <Spinner w={100} h={100} color={`white`}/>
            </motion.div>
          )
        }
      </AnimatePresence>

    </motion.div>
  )
}

export default Page;
