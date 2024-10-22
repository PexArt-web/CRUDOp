
const Input = ({name, placeholder, type , handleInput}) => {
  return (
    <div>
      <input className="input-field" name= {name} placeholder = {placeholder}  type = {type} onChange={handleInput} />
    </div>
  )
}

export default Input
