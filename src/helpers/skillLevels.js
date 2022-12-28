
const skillLevels = {
    SKILL_LEVELS: ["Początkujący", "Po kursach", "Zaawansowany", "Profesjonalista", "Wieloletnie doświadczenie"],
    
    skillLevelToIndex: ( str ) => {
        return skillLevels.SKILL_LEVELS.indexOf( str )
    }
}


export default skillLevels;