
const Input = ({name, placeholder, type , handleInput, value}) => {
  return (
    <div>
      <input className="input-field" name= {name} placeholder = {placeholder}  type = {type} onChange={handleInput} value = {value} />
    </div>
  )
}

export default Input
