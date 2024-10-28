using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UI;

[Serializable]
public class Tag
{
    public string name;
    public string value;
}

public class GameManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void Alert();

    [DllImport("__Internal")]
    private static extern void AlertParam(string message);

    [DllImport("__Internal")]
    private static extern void SendMessageToAO(string data, string tags);


    // Two lists exposed in the Inspector: one for message tags and one for dryrun tags
    public List<Tag> messageTags = new List<Tag>();
    public List<Tag> dryrunTags = new List<Tag>();

    public Button[] buttons;

    void Start()
    {
        buttons[0].onClick.AddListener(() => { CallJs(); });
        buttons[1].onClick.AddListener(() => { SendAOMessage(); });
        // buttons[2].onClick.AddListener(() => { FetchAOMessage(); });
    }

    void CallJs()
    {
        Alert();
    }

    public void SendAOMessage()
    {
        string data = "Data from Unity";  // Dynamic data can be changed here
        string tagsJson = ConvertTagsToJson(messageTags);

        Debug.Log("Sending AO message with data: " + data + " and tags: " + tagsJson);

        SendMessageToAO(data, tagsJson);
        Debug.Log("Message sent to AOConnect with messageTags: " + tagsJson);
    }


    private string ConvertTagsToJson(List<Tag> tagList)
    {
        List<string> jsonTags = new List<string>();

        foreach (Tag tag in tagList)
        {
            jsonTags.Add($"{{\"name\":\"{tag.name}\",\"value\":\"{tag.value}\"}}");
        }

        return $"[{string.Join(",", jsonTags)}]";
    }
}
