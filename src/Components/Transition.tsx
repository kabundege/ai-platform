import { motion,Transition } from "framer-motion";
import { ReactNode } from "react";

interface Props {
	children:ReactNode,
	x?:number,
	y?:number,
	stiffness?:number,
	damping?:number,
	type?: Transition['type']
}

const Transitions = ({ children,x=0,y=300,stiffness=260,damping=20,type="spring" }:Props) => {
	return (
		<motion.div
			initial={{ y,x, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y,x, opacity: 0 }}
			transition={{type,stiffness,damping}}
		>
			{children}
		</motion.div>
	);
};
export default Transitions;
