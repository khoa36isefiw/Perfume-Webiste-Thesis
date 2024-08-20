import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CategoryIcon from '@mui/icons-material/Category';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { theme } from '../../Theme/Theme';

export const missionsData = [
    {
        missionTitle: 'Fast delivery',
        missionIcon: (
            <ElectricBoltIcon sx={{ fontSize: '28px', color: theme.palette.secondaryText }} />
        ),
        missionContent:
            'The specific delivery time will vary depending on the shipping address and the selected delivery option. Customers can track their order online to see the estimated delivery date.',
    },
    {
        missionTitle: 'Many offers',
        missionIcon: <CategoryIcon sx={{ fontSize: '28px', color: theme.palette.secondaryText }} />,
        missionContent:
            'CMS also offers a variety of training and technical assistance to help providers and state agencies meet their responsibilities under Medicare, Medicaid, and SCHIP.',
    },
    {
        missionTitle: '24/7 support',
        missionIcon: (
            <SupportAgentIcon sx={{ fontSize: '28px', color: theme.palette.secondaryText }} />
        ),
        missionContent:
            'CMS Service support is available 24 hours a day, 7 days a week. You can reach them by phone, email, or chat. Here are the contact information for CMS Service support.',
    },
];
