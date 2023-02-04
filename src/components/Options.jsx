import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { IconButton, Menu,MenuItem, MenuButton, MenuList } from '@chakra-ui/react'
import React from 'react'

const Options = ({options, actions}) => {
  console.log(actions)
  return (
    <Menu>
  <MenuButton
    bg='gray.200'
    as={IconButton}
    aria-label='Options'
    icon={<HamburgerIcon />}
    variant='outline'
  />
  <MenuList>
    {
        options.map((option) => {
          if(option.isVisible){

       return <MenuItem icon={option?.icon} onClick={()=> actions[option.name]()}>
           {option.name}
        </MenuItem>
          }
})
    }
  </MenuList>
</Menu>
  )
}

export default Options