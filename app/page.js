import styles from './page.module.css'
import Switch from "@mui/material/Switch";
import CustomSlider from './CustomSlider';

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
 return (
   <div className={styles.container}>
     <div>
       <span>With default Theme:</span>
     </div>
     <Switch {...label} defaultChecked />
     <Switch {...label} />
     <Switch {...label} disabled defaultChecked />
     <CustomSlider warning={true} />
     <CustomSlider warning={false} />
   </div>
 );
}