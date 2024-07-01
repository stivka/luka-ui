import { useCallback, useEffect, useRef, useState } from "react";

const useDrag = () => {
	const ref = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const handlePointerDown = useCallback(
		(e) => {
			setIsDragging(true);
			setDragStart({
				x: e.clientX - position.x,
				y: e.clientY - position.y,
			});
		},
		[position],
	);

	const handlePointerUp = useCallback(() => setIsDragging(false), []);

	const handlePointerMove = useCallback(
		(e) => {
			if (isDragging) {
				setPosition({
					x: e.clientX - dragStart.x,
					y: e.clientY - dragStart.y,
				});
			}
		},
		[isDragging, dragStart],
	);

	useEffect(() => {
		const element = ref.current;
		if (element) {
			if (isDragging) {
				element.addEventListener("pointerup", handlePointerUp);
				element.addEventListener("pointermove", handlePointerMove);
			} else {
				element.removeEventListener("pointerup", handlePointerUp);
				element.removeEventListener("pointermove", handlePointerMove);
			}

			return () => {
				element.removeEventListener("pointerup", handlePointerUp);
				element.removeEventListener("pointermove", handlePointerMove);
			};
		}
	}, [isDragging, handlePointerUp, handlePointerMove]);

	return { ref, position, startDragging: handlePointerDown, isDragging };
};

export default useDrag;
