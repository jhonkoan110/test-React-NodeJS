import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Block from '../../components/Block/Block';
import { setCurrentMaster } from '../../redux/masters/actionCreators';
import { IMaster } from '../../redux/masters/reducer';
import { AppStateType } from '../../redux/store';
import './Profile.css';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
    const { id }: any = useParams();
    const dipsatch = useDispatch();
    const master: IMaster | null = useSelector(
        (state: AppStateType) => state.masterList.currentMaster,
    );

    useEffect(() => {
        fetch(`/api/master/${id}`)
            .then((response) => response.json())
            .then((master) => dipsatch(setCurrentMaster(master)));
    }, []);

    return (
        <Block>
            <div className="profile__header">
                <h2>Мастер LOGIN</h2>
            </div>
            <fieldset>
                <legend>login</legend>
                <input type="text" />
            </fieldset>
            <fieldset>
                <legend>фамилия</legend>
                <input type="text" />
            </fieldset>
            <fieldset>
                <legend>имя</legend>
                <input type="text" />
            </fieldset>
            <fieldset>
                <legend>отчество</legend>
                <input type="text" />
            </fieldset>
            <fieldset>
                <legend>специализация</legend>
                <input type="text" />
            </fieldset>
        </Block>
    );
};

export default Profile;
