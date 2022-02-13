import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const FilterTasks = (props) => {
  const selectedButton = (event) => {
    props.onChangeFilter(event.target.value);
  }

  return (
    <div>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1, mb: 1 }}>
        Filter by:
      </Typography>

      <ButtonGroup onClick={selectedButton} variant='outlined' aria-label='outlined button group' fullWidth sx={{ mb: 3 }} >
        <Button value='all' >All</Button>
        <Button value='completed'>Completed</Button>
        <Button value='not-completed'>Not completed</Button>
      </ButtonGroup>
    </div>
  );
};

export default FilterTasks;
