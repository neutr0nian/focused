import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { IconButton, Menu,MenuItem, MenuButton, MenuList } from '@chakra-ui/react'
import React from 'react'

const Options = ({options}) => {
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
        options.map((option) => (
        <MenuItem icon={option?.icon} onClick={()=>option.action()}>
           {option.name}
        </MenuItem>
        ))
    }
  </MenuList>
</Menu>
  )
}

export default Options