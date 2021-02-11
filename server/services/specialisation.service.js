import {
    createSpecialisation,
    deleteSpecialisation,
    getOneSpecialisation,
    getSpecialisations,
    updateSpecialisation,
} from '../repositories/specialisation.repository';

export const createSpecialisation2 = async (req, res) => {
    const { name } = req.body;
    const newSpecialisation = await createSpecialisation(name);
    res.json(newSpecialisation.rows[0]);
};

export const getSpecialisations2 = async (req, res) => {
    const specialisations = await getSpecialisations();
    res.json(specialisations.rows);
};

export const getOneSpecialisation2 = async (req, res) => {
    const id = req.params.id;
    const specialisation = await getOneSpecialisation(id);
    res.json(specialisation.rows[0]);
};

export const updateSpecialisation2 = async (req, res) => {
    const { id, name } = req.body;
    const specialisation = await updateSpecialisation(id, name);
    res.json(specialisation.rows[0]);
};

export const deleteSpecialisation2 = async (req, res) => {
    const id = req.params.id;

    const result = await deleteSpecialisation(id);
    if (result === 400) {
        console.log(res.status(400));
        res.status(400).json({
            title: `У этой специализации ещё есть мастер(-а)`,
        });
    } else {
        res.json(result.rows[0]);
    }
};
