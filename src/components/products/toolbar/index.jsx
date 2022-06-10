import {Toolbar, SaveButton,} from 'react-admin'

import styels from './toolbarStyles.module.scss'

const MyToolbar = () => (
    <Toolbar>
        <SaveButton label="Save" />
    </Toolbar>
);

export default MyToolbar