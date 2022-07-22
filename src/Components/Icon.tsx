import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// fontawesome solid 추가
library.add(fas);

function Icon(props:IconProp){
  return (
    <FontAwesomeIcon icon={props}/>
  )
}

export default Icon;