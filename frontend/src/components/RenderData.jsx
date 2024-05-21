export default function RenderData({ entityData }) {
    {
        entityData.forEach((dataObj, index) => {
            for(const key in dataObj) {
                return <h2> { dataObj[key] } </h2>
            }
        })
    }
}