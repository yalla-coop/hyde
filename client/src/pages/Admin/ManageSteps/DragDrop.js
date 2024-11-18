import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { Grid as G, Icon, Typography as T } from '../../../components';
import { navRoutes } from '../../../constants';
import { buttonStyle } from './style';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function DragDrop({
  beforeClaiming,
  claiming,
  afterClaiming,
  columns,
  setColumns,
}) {
  const navigate = useNavigate();

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div key={columnId}>
              <G.Row mt="7">
                <G.Col w={[4, 10, 8]}>
                  <T.H2>{column.name}</T.H2>
                </G.Col>
              </G.Row>
              <G.Row mt="4">
                <G.Col w={[4, 10, 8]}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : 'transparent',
                            padding: 4,
                            width: '100%',
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.title + item.id}
                                draggableId={item.title + item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={() =>
                                        navigate(
                                          navRoutes.SUPER_ADMIN.EDIT_STEP.replace(
                                            ':slug',
                                            item.slug
                                          )
                                        )
                                      }
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...buttonStyle,
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <T.P weight="bold">{item.title}</T.P>
                                      <Icon
                                        color="borderPrimary"
                                        icon="forwardArrow"
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </G.Col>
              </G.Row>
            </div>
          );
        })}
      </DragDropContext>
    </>
  );
}

export default DragDrop;
