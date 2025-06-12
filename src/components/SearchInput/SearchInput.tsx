import { styled, alpha, InputBase, InputAdornment, IconButton } from '@mui/material'
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  width: '100%',
}))

type SearchInputProps = {
  keyword: string
  onChange: (keyword: string) => void
}

const SearchInput = ({ keyword, onChange }: SearchInputProps) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={keyword}
        placeholder="請輸入作者姓名..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={e => onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              sx={{ mr: 1, color: theme => alpha(theme.palette.common.white, 0.6) }}
              size="small"
              onClick={() => onChange('')}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Search>
  )
}

export default SearchInput
