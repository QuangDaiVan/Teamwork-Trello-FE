import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'


function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetails }) {
  const [openNewColumnForm, setopenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setopenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('please enter column title')
      return
    }
    // Tạo dữ liệu Column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    //gọi lên props function createNewColumn nằm ở component cha cao nhất (boards/_id.jsx)
    await createNewColumn(newColumnData)

    // đóng trạng thái thêm column mới và clear input.
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  /*
    thằng sortableContext yêu cầu item là 1 mảng dạng ['id-1', 'id-2'] chứ không phải [{id: 'id-1'}, {id:'id-2'}]
    nếu không đúng thì kéo thả sẽ không có animation
  */
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* {columns?.map((column) => {
          return <Column key={column._id} />
        })} */}
        {columns?.map(column => <Column
          key={column._id}
          column={column}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />)}

        {/* Box add new column */}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            borderRadius: '6px',
            mx: 2,
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title"
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiTextField-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }

                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant='contained'
                color='success'
                size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                onClick={toggleOpenNewColumnForm}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }} />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns