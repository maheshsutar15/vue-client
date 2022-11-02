const designationArray = ['superadmin', 'admin', 'user', 'maintenance', 'observer']
const designationOptions = [
  {
    text: 'Please select an Option',
    disabled: true,
    value: null,
  },
  {
    value: 'observer',
    text: 'Observer',
  },
  {
    value: 'maintenance',
    text: 'Maintenance Staff',
  },
  {
    value: 'user',
    text: 'Normal User',
  },
  {
    value: 'admin',
    text: 'Administrative User',
  },
]

function getDesignationOptions(designation) {
  const level = designationArray.indexOf(designation)
  let offset = 5 - level
  return designationOptions.slice(0, offset)
}

module.exports = {
  getDesignationOptions,
  designationArray
}
