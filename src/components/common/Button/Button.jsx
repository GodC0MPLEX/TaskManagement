import React from 'react'
import style from './Button.module.css'

const ActionButton = ({name,onClick,fontSize}) =>{
  return (
    <button onClick={onClick} className={style.activeButton} style={{fontSize:fontSize?fontSize:"16px"}}>
      {name}
    </button>
  )
}

export default ActionButton

export const Button = ({name,onClick}) =>{
    return (
        <button onClick={onClick} className={style.button}>
        {name}
        </button>
    )
    }
