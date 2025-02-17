import { Shield, CheckCircle, AlertCircle } from "lucide-react";

const ScanResult = ({ report }) => {
    if (!report) return null;
    const { attributes } = report.data;
    const totalEngines = attributes.results ? Object.keys(attributes.results).length : 0;
    const detections = Object.values(attributes.results || {}).filter(
        (engine) => engine.category === "malicious"
    ).length;

    // Check if we have any results
    const hasResults = totalEngines > 0;

    return (
        <div className="w-full max-w-xl mx-auto mt-8">
            <div className="backdrop-blur-md bg-white/10 rounded-xl border border-white/20 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-2">
                                <Shield className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Scan Report</h3>
                        </div>
                        {hasResults ? (
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        ) : (
                            <AlertCircle className="w-8 h-8 text-yellow-400" />
                        )}
                    </div>
                    <div className="mt-4 flex items-center space-x-3">
                        {hasResults ? (
                            <>
                                <span className="text-gray-300">Detections:</span>
                                <span className="font-semibold text-green-400">{detections}</span>
                                <span className="text-gray-300">/</span>
                                <span className="font-semibold text-blue-400">{totalEngines}</span>
                            </>
                        ) : (
                            <span className="text-yellow-400 text-xl">Try Again</span>
                        )}
                    </div>
                </div>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    {hasResults ? (
                        <div className="grid grid-cols-1 gap-2">
                            {Object.entries(attributes.results || {}).map(([engine, result]) => (
                                <div
                                    key={engine}
                                    className="flex flex-col p-4 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-white">{engine}</span>
                                        <span className={`px-4 py-1 rounded-full text-sm font-medium
                                            ${result.category === 'malicious'
                                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                                : 'bg-green-500/20 text-green-300 border border-green-500/30'
                                            }`}
                                        >
                                            {result.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-gray-400">No scan results are currently available. This could be because the scan is still in progress or no engines have reported results yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScanResult;