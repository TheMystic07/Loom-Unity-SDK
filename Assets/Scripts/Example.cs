using UnityEngine;
using System.Runtime.InteropServices;   
using System;
using System.Threading.Tasks;

public class GameController : MonoBehaviour
{
    private AOManager aoManager;
    private string userAddress;

    async void Start()
    {
        aoManager = GetComponent<AOManager>();
        
        // Connect wallet
        userAddress = await aoManager.ConnectArweaveWallet();
        Debug.Log($"Connected wallet address: {userAddress}");
    }

    public async void SendMessageExample()
    {
        string processId = "16m5PMfzL6wtFC_SQPF_at6hspVMM6PCPQYWfUuypcI";
        string messageData = "Hello AO!";
        AOTag[] tags = new AOTag[]
        {
            new AOTag { name = "Action", value = "Loda" },
            // new AOTag { name = "Custom-Tag", value = "Custom-Value" }
        };

        string response = await aoManager.SendMessage(processId, messageData, tags);
        Debug.Log($"AO response: {response}");
    }

    public async void DryRunExample()
    {
        string processId = "16m5PMfzL6wtFC_SQPF_at6hspVMM6PCPQYWfUuypcI";
        string data = "Dry run data";
        AOTag[] tags = new AOTag[]
        {
            new AOTag { name = "Action", value = "Balance" },
            new AOTag { name = "Custom-Tag", value = "Custom-Value" }
        };

        string response = await aoManager.DryRun(processId, data, tags);
        Debug.Log($"AO dry run response: {response}");
    }

    private void Update() {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SendMessageExample();
        }
        if (Input.GetKeyDown(KeyCode.D))
        {
            DryRunExample();
        }
    }
}