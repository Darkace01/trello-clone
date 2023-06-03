'use client';
import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {
  const [getBoard, board, setBoardState] = useBoardStore((state) => [
    state.getBoard,
    state.board,
    state.setBoardState,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if user dragged card outside of board
    if (!destination) return;

    //Handle column drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }
    // This step is needed as the indexes are stored as numbers 0,1,2 etc. instead of id's with DND library
    const columns = Array.from(board.columns);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
