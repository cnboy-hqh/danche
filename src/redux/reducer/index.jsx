const initialState = {
  menuName:'首页'
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state=initialState,action) {
  switch(action.type){
    case 'SWITCH_MENU':
      return {
        ...state,
        menuName:action.menuName
      }
    default:{
      return state;
    }
  }
}