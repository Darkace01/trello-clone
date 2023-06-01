'use client';
import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Board() {
  const [getBoard, board] = useBoardStore((state) => [
    state.getBoard,
    state.board,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log(board);
  return (
    <h1>Hello</h1>
    // <DragDropContext>
    //   <Droppable droppableId='board' direction='horizontal' type='column'>
    //     {(provided) => <div>{/* Rendering all the columns */}</div>}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default Board;
