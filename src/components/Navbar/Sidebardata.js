import React from "react";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Simple Flow - No functions',
        path: '/flow1',
        icon: <AiIcons.AiOutlineNodeIndex />,
        cName: 'nav-text'
    },
    {
        title: 'Flow with edge additions',
        path: '/flow2',
        icon: <AiIcons.AiOutlineShrink />,
        cName: 'nav-text'
    },
    {
        title: 'Flow with full-connected node',
        path: '/flow3',
        icon: <AiIcons.AiOutlineShareAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Empty Editable Flow',
        path: '/flow4',
        icon: <AiIcons.AiOutlineRadiusSetting />,
        cName: 'nav-text'
    },
]