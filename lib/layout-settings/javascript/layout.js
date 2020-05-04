const storageItem = localStorage.getItem('layout-settings');
const storageData = storageItem ? JSON.parse(storageItem) : defaultLayoutSettings;

function checkNumConstraints(obj) {
    if (obj.min && parseInt(obj.value) < parseInt(obj.min)) {
        obj.value = obj.min
    }
    if (obj.max && parseInt(obj.value) > parseInt(obj.max)) {
        obj.value = obj.max
    }
}

function goBack() {
    window.history.back();
}

function resetAllValues() {
    for (setting in defaultLayoutSettings) {
        const settingStr = setting
        const settingObject = document.getElementById(settingStr);

        storageData[settingStr] = defaultLayoutSettings[settingStr];
        localStorage.setItem('layout-settings', JSON.stringify(storageData));
        settingObject.value = storageData[settingStr]
    }
}

function addSettingEventListeners() {
    for (setting in defaultLayoutSettings) {
        const settingStr = setting
        const settingObject = document.getElementById(settingStr);

        settingObject.addEventListener('change', () => {

            if (settingObject.type === 'number') {
                checkNumConstraints(settingObject)
            }


            storageData[settingStr] = settingObject.value;
            localStorage.setItem('layout-settings', JSON.stringify(storageData));
        });
        settingObject.value = storageData[settingStr]
    }
}

addSettingEventListeners();

const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', () => {
    resetAllValues()
})