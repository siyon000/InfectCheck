const ScanResult = ({ report }) => {
    if (!report) return null;
    console.log(report)
    const { attributes } = report.data;
    // const attributes = report.data.attributes;
    const totalEngines = attributes.results ? Object.keys(attributes.results).length : 0;

    const detections = Object.values(attributes.results || {}).filter(
        (engine) => engine.category === "malicious"
    ).length;

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Scan Report</h3>
            <p className="text-sm text-gray-600 mb-4">Detections: <span className="font-semibold text-green-600">{detections}</span> / <span className="font-semibold text-blue-600">{totalEngines}</span></p>

            <ul className="space-y-2">
                {Object.entries(attributes.results || {}).map(([engine, result]) => (
                    <li key={engine} className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="font-medium text-gray-700">{engine}</span>
                        <span className={`text-sm ${result.category === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>{result.category}</span>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default ScanResult;
