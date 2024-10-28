using UnityEngine;
using System.Runtime.InteropServices;
using System;
using System.Threading.Tasks;

[Serializable]
public class AOTag
{
    public string name;
    public string value;
}

public class AOManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern string ConnectWallet();

    [DllImport("__Internal")]
    private static extern string SendAOMessage(string processId, string data, string tagsJson);

    [DllImport("__Internal")]
    private static extern string GetAOResult(string messageId, string processId);

    [DllImport("__Internal")]
    private static extern string DryRunAO(string processId, string data, string tagsJson);

    // Connect Wallet
    public async Task<string> ConnectArweaveWallet()
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
            string address = ConnectWallet();
            return address;
        #else
            return "Wallet connection only available in WebGL build";
        #endif
    }

    // Send Message
    public async Task<string> SendMessage(string processId, string data, AOTag[] tags)
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
            string tagsJson = JsonUtility.ToJson(new { tags = tags });
            string response = SendAOMessage(processId, data, tagsJson);
            return response;
        #else
            return "Function only available in WebGL build";
        #endif
    }

    // Get Result
    public async Task<string> GetResult(string messageId, string processId)
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
            string response = GetAOResult(messageId, processId);
            return response;
        #else
            return "Function only available in WebGL build";
        #endif
    }

    // Dry Run
    public async Task<string> DryRun(string processId, string data, AOTag[] tags)
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
            string tagsJson = JsonUtility.ToJson(new { tags = tags });
            string response = DryRunAO(processId, data, tagsJson);
            return response;
        #else
            return "Function only available in WebGL build";
        #endif
    }
}